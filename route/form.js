const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const connection = require('../DBConnection/connectivity')
const form = require('../model/formModel')
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/menu', async (req, res) => {
  try {
    const users = await form.findAll({ attributes: ['formName'] });
    res.json(users);
  }
  catch (err) {
    console.error('Error in GET /menu:', err);
    res.status(500).json({ error: "An error occurred while fetching the menu", details: err.message });
    // res.json({ error: err })
    // console.error('Error in getPost:', err);
  }

});


// ,
//       attributes: ['form'] 

router.get('/form', async (req, res) => {
  const formName = req.query.formName
  if (!formName || formName.trim() === '') {
    return res.status(400).json({ error: "formName query parameter is required" });
  }
  try {
    const jsonform = await form.findAll({
      where: {
        formName: formName
      },
      attributes: ['form']
    });
    if (!jsonform) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(jsonform);
  }
  catch (err) {
    console.error('Error in getFormParam:', err);
    res.status(500).json({ error: "An error occurred while fetching the form", details: err.message });
    // res.json({ error: err })
    // console.error('Error in getPost:', err);

  }

});



router.get('/formparam', async (req, res) => {
  const formName = req.query.formName
  if (!formName || formName.trim() === '') {
    return res.status(400).json({ error: "formName query parameter is required" });
  }
  try {
    const jsonform = await form.findAll({
      where: {

        formName: formName
      }
    });
    if (!jsonform) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(jsonform);
    // res.json(jsonform);
  }
  catch (err) {
    console.error('Error in getFormParam:', err);
    res.status(500).json({ error: "An error occurred while fetching the form", details: err.message });
    // res.json({ error: err })
    // console.error('Error in getPost:', err);

  }

});
// router.get('/form', async (req, res) => {
//     let Obj = {
//         title: title,
//         type: type,
//         formproperty: formproperty
//     };
//     res.json(Obj);
// });

router.post('/form', async (req, res) => {
  const { formName, formjson } = req.body
  if (!formName || !formjson || formName.trim() === '' || typeof formjson !== 'object') {
    return res.status(400).json({ error: "formName and formjson are required" });
  }
  try {
    newForm = await form.create({
      formName: formName,
      form: formjson
    });
    if (!newForm) {
      res.json({ message: "Something went wrong" })
    }
    res.json({ message: "posted Successfully" })
  }
  catch (err) {
    res.json({ error: err })
  }
})


router.put('/removeField', async (req, res) => {
  const { formName, fieldName } = req.body
  console.log(formName, fieldName);
  if (!formName || !fieldName ) {
    return res.status(400).json({ error: "formName and fieldName are required" });
  }
  try {
    const jsonform = await form.findAll({

      attributes: ['form'],
      where: {
        formName: formName
      }
    });
    console.log(jsonform);
    if (!jsonform) {
      return res.status(404).json({ error: "Form not found" });
    }
    let finaljson = jsonform[0].form
    if (!finaljson.hasOwnProperty(fieldName)) {
      return res.status(404).json({ error: "Field not found in the form" });
    }
    delete finaljson[fieldName]
    console.log(finaljson);
    //  let jsonval=JSON.stringify(finaljson);

    const updatedForm = await form.update({
      form: finaljson
    }, {
      where: {
        formName: formName,
      },
      returning: true,
      plain: true
    });
    const [affectedCount, affectedRows] = updatedForm;
    console.log(affectedCount);
    console.log(affectedRows);
    res.json({ message: "Field removed successfully", updatedForm: updatedForm[1] });
    // console.log(newForm);
    // res.json({ message: "Removed Successfully" })


  }
  catch (err) {
    console.error("removeField error:", err);
    res.status(500).json({ error: "An error occurred while removing the field", details: err.message });
    // res.json({ "removefield error": err })
  }
})


router.put('/form', async (req, res) => {
  const { formName, formjson } = req.body

  let parsedFormjson;
  try {
    parsedFormjson = typeof formjson === 'string' ? JSON.parse(formjson) : formjson;
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON format" });
  }

  console.log("Parsed formjson: ", parsedFormjson);

  try {

    const jsonform = await form.findAll({

      attributes: ['form'],
      where: {
        formName: formName
      }
    });
    if (jsonform.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    let finaljson = jsonform[0].form
    let mergerObject = Object.assign({}, finaljson, parsedFormjson)
    console.log(mergerObject);
    // let jsonval=JSON.stringify(mergerObject);    [numberOfAffectedRows, updatedRows]

    try {
      const numberOfAffectedRows = await form.update({
        form: mergerObject
      }, {
        where: {
          formName: formName,
        }

      });
      console.log("Number of affected rows: " + numberOfAffectedRows);
      if (numberOfAffectedRows > 0) {
        res.json({ message: "Updated Successfully" });
      } else {
        res.status(400).json({ message: "No rows updated" });
      }
    } catch (err) {
      console.error("Updating error:", err);
      res.status(500).json({ message: "Updating error" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
});


router.put('/update', async (req, res) => {
  const { formName, formjson } = req.body

  let parsedFormjson;
  try {
    parsedFormjson = typeof formjson === 'string' ? JSON.parse(formjson) : formjson;
  } catch (error) {
    return res.status(400).json({ message: "Invalid JSON format" });
  }

  console.log("Parsed formjson: ", parsedFormjson);

  try {

    const jsonform = await form.findAll({

      attributes: ['form'],
      where: {
        formName: formName
      }
    });
    if (jsonform.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    // let finaljson = jsonform[0].form
    let mergerObject = Object.assign({}, jsonform, parsedFormjson)
    console.log(mergerObject);
    // let jsonval=JSON.stringify(mergerObject);    [numberOfAffectedRows, updatedRows]

    try {
      const numberOfAffectedRows = await form.update({
        form: mergerObject
      }, {
        where: {
          formName: formName,
        }

      });
      console.log("Number of affected rows: " + numberOfAffectedRows);
      if (numberOfAffectedRows > 0) {
        res.json({ message: "Updated Successfully" });
      } else {
        res.status(400).json({ message: "No rows updated" });
      }
    } catch (err) {
      console.error("Updating error:", err);
      res.status(500).json({ message: "Updating error" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.delete('/form', async (req, res) => {
  const { formName } = req.body

  if (!formName ) {
    return res.status(400).json({ error: "formName is required" });
  }
  try {
    const deletedForm = await form.destroy({
      where: { formName: formName.formName }
    });
    console.log(deletedForm); 
    if (deletedForm>0) {
      res.status(200).json({ message: "Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Form not found" });
    }

  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;