const eventModel = require("../models/eventmodel")


const createEvent = async (req, res) => {


    console.log("[Handler] POST createEvent")


    const { title, description, status, venue, date, startTime, organizer, category, registrationDeadline } = req.body
    const newEvent = new eventModel({
        title: title,
        description: description,
        status: status,
        venue: venue,
        date: date,
        startTime: startTime,
        organizer: organizer,
        category: category,
        registrationDeadline: registrationDeadline,
        id: eventModel.length + 1
    })
    try {
        eventModel.push(newEvent)
        console.log("[Handler] POST createEvent: New Event created successfully!")
        return res.status(201).json(newEvent)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}


const updateEvent = async (req, res) => {


    console.log("[Handler] PUT updateEvent")


    const { id } = req.params
    const event = eventModel.find((event) => event.id === parseInt(id))


    if (!event) {
        console.log("[Handler] PUT updateEvent: No Event found, try with another id!")
        return res.status(400).json({ message: error.message })
    }
    console.log("[Handler] PUT updateEvent: Event found!")


    const { title, description, status, venue, date, startTime, organizer, category, registrationDeadline } = req.body
    const updatedEvent = { title, description, status, venue, date, startTime, organizer, category, registrationDeadline, _id: id }
    try {
        eventModel[id - 1] = updatedEvent
        console.log("[Handler] PUT updateEvent: Event updated successfully!")
        res.status(200).json(updatedEvent)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}


const getAllUpcomingEvents = async (req, res) => {


    console.log("[Handler] GET getAllUpcomingEvents")


    try {
        const upcomingEvents = eventModel.filter((event) => event.status === "upcoming")
        console.log("[Handler] GET getAllUpcomingEvents: Upcoming Events fetched successfully!")
        res.status(200).json(upcomingEvents)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}


const getAllEvents = async (req, res) => {


    console.log("[Handler] GET getAllEvents")


    try {
        console.log("[Handler] GET getAllEvents: All Events fetched successfully!")
        res.status(200).json(eventModel)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}


const registerForEvent = async (req, res) => {


    console.log("[Handler] POST registerForEvent")


    const { id } = req.params
    const event = eventModel.find((event) => event.id === parseInt(id))


    if (!event) {
        console.log("[Handler] POST registerForEvent: No Event found, try with another id!")
        return res.status(400).json({ message: error.message })
    }
    console.log("[Handler] POST registerForEvent: Event found!")


    try {
        eventModel[id - 1].participants.push(req.user.email)
        console.log("[Handler] POST registerForEvent: Event registered successfully!")
        res.status(200).json(eventModel[id - 1])
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
    }
}


module.exports = { createEvent, updateEvent, getAllUpcomingEvents, getAllEvents, registerForEvent }
