const router = require("express").Router();
const Requests = require("../model/Requests");

router.post("/putrequest", async (req, res) => {


  const request = new Requests({
    from: req.body.from,
    to: req.body.to,
    email:req.body.email,
    account: req.body.account,
    gender: req.body.gender,
    phoneno: req.body.phoneno,
    age: req.body.age,
    city: req.body.city,
    specialization: req.body.specialization,
  });
  try {
    request
      .save()
      .then((result) => {
        console.log("Request created");
        res.status(201).json({
          message: "Request Created",
          success: true,
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(200)
          .json({ success: false, error: "Unable to create User" });
      });
  } catch (err) {
    res.status(200).json({ success: false, error: "Unable to create User" });
  }
});

//get all requests
router.post("/getrequests", async (req, res) => {
    console.log(req.body);
  try {
    const data = await Requests.find({to:req.body.email});
    const count = await Requests.find({ to: req.body.email }).count();

    if (count >0) {
        res.status(200).json({
          success: true,
          data: data,
          message: "Displaying list of requests available",
        });
    } else {
        res.status(200).json({
          success: false,
          message: "No requests for you",
        });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error });
  }
});

router.delete('/:id',(req,res)=>{
  console.log(req.params)
  Requests.remove({_id: req.params.id},(err,request)=>{
    if(err){
      res.json({
        success:false,
        message:"Could not delete request"
      })
    }
    else res.json({
      success:true,
      message:"Request removed"
    })
  })
   
})

module.exports = router;
