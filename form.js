const form = {
  "title": "Dynamic Form",
  "type": "object",
  "formproperty": [
        {
      "type": "text",
      "id":"First Name",
      "name": "First Name",
      "placeholder":"First Name",
      "values":null,
      "size":30,
      "required": true
    },
    {
      "type": "text",
      "id":"First Name",
      "name": "Last Name",
      "placeholder":"Last Name",
      "values":null,
      "size":30,
      "required": true
    },
    {
      "type": "email",
      "id":"Email",
      "name": "Email",
      "placeholder":"Email",
      "values":null,
      "size":30,
      "required": true
    },
    {
      "type": "tel",
      "id":"Mobile Number",
      "name": "Mobile Number",
      "placeholder":"9876543210",
      "values":null,
      "pattern":"[789][0-9]{9}",
      "minLength": 10,
      "maxLength":10,
      "size":30,
      "required": true
    },
    {
      "type": "tel",
      "id":"Tele Number",
      "name": "Tele Number",
      "placeholder":"123-456-7890",
      "values":null,
      "pattern":"[0-9]{3}-[0-9]{3}-[0-9]{4}",
      "minLength": 10,
      "maxLength":12,
      "size":30,
      "required": true
    },
    {
      "type": "date",
      "id":"Date",
      "name": "Date",
      "required": true
    },
     {
      "type": "checkbox",
      "id":"Known Language",
      "name": "Known Language",
      "options":[
            { "id": "1", "label": "C","values":"C" },
            { "id": "2", "label": "Java", "values":"Java"},
            { "id": "3", "label": "Python","values":"Python" }
      ],
      "required": true
    },
  
    {
      "type": "radio",
      "id":"Gender",
      "name":"Gender",
      "options":[
        { "id": "1", "label": "Male","values":"male"},
        { "id": "2", "label": "Female", "values":"female"},
  ],
      "required": true
    },
    {
      "type": "dropdown",
      "id":"Location",
      "name": "Location",
      "values":[
        {  "label": "Select Location","values":"Select Location" },
        {  "label": "Tiruppur","values":"Tiruppur" },
        {  "label": "Coimbatore", "values":"Coimbatore"},
  ],
      "required": true
    }
  ]
}


module.exports = form;