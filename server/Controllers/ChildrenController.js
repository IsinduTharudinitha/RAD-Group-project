const Children= require('../Models/ChildrenModel');

module.exports.createChildren = async (req, res, next) => {
    try {
        const {ChildrenID, Name, Age, TelephoneNum,createdAt } = req.body;
        const children = await Children.findOne({ ChildrenID });
        if (children) {
          return res.status(400).json({ message: "Children already exists" });
        }
        const CreatedChildren = await Children.create({ ChildrenID, Name, Age, TelephoneNum,createdAt });
        res
          .status(201)
          .json({ message: "Created the Children log successfully", success: true, CreatedChildren });
      } catch (error) {
        console.error(error);
      }
};

module.exports.getAllChildrens = async (req, res, next) => {
  try {
    const childrens = await Children.find();
    res.status(200).json(childrens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports.viewChildren = async (req, res, next) => {
    try {
      const {ChildrenID} = req.params;
  
      const children = await Children.findOne({ ChildrenID });
      if (!children) {
        return res.status(400).json({ message: "Children not found" });
      }
      res
        .status(201)
        .json({ message: "Children Found", success: true, children });
    } catch (error) {
      console.error(error);
    }
  };
  
  
  module.exports.deleteChildren = async (req, res, next) => {
      try {
        const { ChildrenID} = req.params;
    
        const children = await Children.findOne({ ChildrenID });
        if (!children) {
          return res.status(400).json({ message: "Children not found" });
        }
        deletedChildren = await Children.findOneAndDelete({ChildrenID} );
        res
          .status(201)
          .json({ message: "Children Record Deleted", success: true, deletedChildren });
      } catch (error) {
        console.error(error);
      }
    };
  
  
  module.exports.updateChildren = async (req, res) => {
    try {
      const { ChildrenID } = req.params;
      const {  Name, Age, TelephoneNum,createdAt } = req.body;
  
      const children = await Children.findOne({ ChildrenID });
  
      if (!children) {
        return res.status(400).json({ message: "Children not found" });
      }
  
      children.Name= Name;
      children.Age= Age;
      children.TelephoneNum= TelephoneNum;
      children.createdAt= createdAt;
  
      await children.save();
  
      res.status(200).json({ message: "Children updated successfully", success: true, updatedChildren: children });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };