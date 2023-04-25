exports.event = async (req, res) => {
    console.log("Event recieved : " + req.body.type);
    res.send({})
}