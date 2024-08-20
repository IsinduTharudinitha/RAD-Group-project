const Guardian= require('../Models/GuardianModel');

module.exports.createGuardian = async (req, res, next) => {
    try {
        const {GuardianID, Name, Email, TelephoneNum,createdAt } = req.body;
        const guardian = await Guardian.findOne({ GuardianID });
        if (guardian) {
          return res.status(400).json({ message: "Guardian already exists" });
        }
        const CreatedGuardian = await Guardian.create({ GuardianID, Name, Email, TelephoneNum,createdAt });
        res
          .status(201)
          .json({ message: "Created the Guardian log successfully", success: true, CreatedGuardian });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllGuardians = async (req, res, next) => {
  try {
    const guardians = await Guardian.find();
    res.status(200).json(guardians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewGuardian = async (req, res, next) => {
    try {
      const {GuardianID} = req.params;
  
      const guardian = await Guardian.findOne({ GuardianID });
      if (!guardian) {
        return res.status(400).json({ message: "Guardian not found" });
      }
      res
        .status(201)
        .json({ message: "Guardian Found", success: true, guardian });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteGuardian = async (req, res, next) => {
      try {
        const { GuardianID} = req.params;
    
        const guardian = await Guardian.findOne({ GuardianID });
        if (!guardian) {
          return res.status(400).json({ message: "Guardian not found" });
        }
        deletedGuardian = await Guardian.findOneAndDelete({GuardianID} );
        res
          .status(201)
          .json({ message: "Guardian Record Deleted", success: true, deletedGuardian });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateGuardian = async (req, res) => {
    try {
      const { GuardianID } = req.params;
      const {  Name, Email, TelephoneNum,createdAt } = req.body;
  
      const guardian = await Guardian.findOne({ GuardianID });
  
      if (!guardian) {
        return res.status(400).json({ message: "Guardian not found" });
      }
  
      guardian.Name= Name;
      guardian.Email= Email;
      guardian.TelephoneNum= TelephoneNum;
      guardian.createdAt= createdAt;
  
      await guardian.save();
  
      res.status(200).json({ message: "Guardian updated successfully", success: true, updatedGuardian: guardian });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };