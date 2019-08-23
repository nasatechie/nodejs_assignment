import City from "../models/cities";

function getAllCities(request, response) {
    City.find().exec((err, cities) => {
        if (err) {
            response.status(400).json({ error: err.message });
        } else {
            response.json(cities);
        }
    });
}

function addCity(request, response) {
    console.log(request.body);
    const newCity = new City(request.body);
    newCity.save({ new: true }, (err, newCity) => {
        if (err) {
            response.status(400).json({ error: err.message });
        }
        response.status(201).json(newCity);
    });
}

function updateCity(request, response) {
    City.findOneAndUpdate(
        { _id: request.params.id },
        request.body,
        { new: true, upsert: true },
        (err, updatedCity) => {
            if (err) {
                response.status(400).json({ error: err.message });
            }
            response.json(updatedCity);
        }
    );
}

function deleteCity(request, response) {
    City.deleteOne({ _id: request.params.id }, (err, result) => {
        if (err) {
            response.status(400).json({ error: err.message });
        }
        const { deletedCount } = result;
        if (deletedCount > 0) {
            response.json({ message: "Deleted Successfully" });
        } else {
            response.json({ message: "No record found!" });
        }
    });
}
export { addCity, getAllCities, updateCity, deleteCity };
