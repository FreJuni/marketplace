const Notification = require("../models/notification");


exports.pushNotification = async (req,res) => {
    const {phone_number,product_id,owner_id,message,title} = req.body;
    try {
        const pushNoti =  await Notification.create({phone_number,product_id,owner_id,message,title})

        return res.status(200).json({isSucess : true, message : "Notification is pushed."})
    } catch (error) {
        return res.status(401).json({isSucess : false, message : error.message})
    }
}

exports.getAllNotification = async (req,res) => {
    try {
        const notiDoc= await Notification.find({owner_id : req.userId}).sort({createdAt : -1})

        if(!notiDoc) {
            throw new Error ("No notification yet.")
        }
       
        return res.status(200).json({isSucess : true,notiDoc, message : "Notification ."})
    } catch (error) {
        return res.status(401).json({isSucess : false, message : error.message})
    }
}

// get read noti
exports.readNotification = async (req,res) => {
    const {id} = req.params;
    try {

        const notificationDoc = await Notification.findById({ _id: id});

        if (req.userId.toString() !== notificationDoc.owner_id.toString()) {
          throw new Error("Authentication Failed.");
        }

      const notiDoc = await Notification.findById(id);
      if(!notiDoc) {
        throw new Error("Notification not found")
      }
      notiDoc.isRead = true;
      await notiDoc.save();
      return res.status(201).json({isSucess : true, notiDoc, message : "Mark as read."})
    } catch (error) {
      return res.status(401).json({isSucess : false, message : error.message})
    }
  }
  
  // delete noti
  exports.deleteNotification = async (req,res) => {
    const {id} = req.params;
    try {

        const notificationDoc = await Notification.findById({ _id: id});

        if (req.userId.toString() !== notificationDoc.owner_id.toString()) {
          throw new Error("Authentication Failed.");
        }

      const notiDoc = await Notification.findByIdAndDelete(id);
      if(!notiDoc) {
        throw new Error("Error delete notification.")
      }
      return res.status(201).json({isSucess : true, message : "Delete bid sucessfully."})
    } catch (error) {
      return res.status(401).json({isSucess : false, message : error.message})
    }
  }
  
  // delete all noti
  exports.deleteAllNotification = async (req,res) => {
    try {
      const notiDoc = await Notification.deleteMany({});
      if(!notiDoc) {
        throw new Error("Error delete notification.")
      }
      return res.status(201).json({isSucess : true, message : "Delete all bid sucessfully."})
    } catch (error) {
      return res.status(401).json({isSucess : false, message : error.message})
    }
  }
  