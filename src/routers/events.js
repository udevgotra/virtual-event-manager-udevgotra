const express = require('express')
const router = express.Router()
router.use(express.json())


const { validateUserLogin } = require('../middlewares/userValidation')


const { authenticateToken,
    authorizeUser } = require('../middlewares/userAuthentication')


const { createEventDetailsValidation,
    updateEventDetailsValidation } = require('../middlewares/eventDetailsValidation')


const { createEvent,
    updateEvent,
    getAllUpcomingEvents,
    getAllEvents,
    registerForEvent } = require('../controllers/eventhandler')


// Create an event,
router.post("/",
    validateUserLogin,
    authenticateToken,
    authorizeUser,
    createEventDetailsValidation,
    createEvent)


// Update an event, logged in user? check if user is admin, create an event
router.put("/:id",
    validateUserLogin,
    authenticateToken,
    authorizeUser,
    updateEventDetailsValidation,
    updateEvent)


//get all upcomming events,
router.get("/upcoming",
    validateUserLogin,
    authenticateToken,
    getAllUpcomingEvents)


//get all events,
router.get("/",
    validateUserLogin,
    authenticateToken,
    getAllEvents)


//register for an event
router.post("/register/:id", // register for upcoming as well as ongoing events only
    validateUserLogin,
    authenticateToken,
    registerForEvent)

module.exports = router