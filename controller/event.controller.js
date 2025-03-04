import { calendar } from "../services/event.service.js";

const getAllEvents = async (req, res) => {
    try {
        const response = await calendar.events.list({
            calendarId: "primary",
            timeMin: new Date().toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: "startTime",
        });

        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const updatedEvent = req.body;

    try {
        const response = await calendar.events.update({
            calendarId: "primary",
            eventId: eventId,
            resource: updatedEvent,
        });

        res.json({ message: "Event updated successfully!", event: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        await calendar.events.delete({
            calendarId: "primary",
            eventId: eventId,
        });

        res.json({ message: "Event deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addEvent = async (req, res) => {
    const event = req.body;

    try {
        const response = await calendar.events.insert({
            calendarId: "primary",
            resource: event,
        });

        res.json({ message: "Event created successfully!", event: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllEvents, updateEvent, deleteEvent, addEvent };
