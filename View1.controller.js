sap.ui.define([
    "sap/ui/core/mvc/Controller",		"sap/ui/model/json/JSONModel",
	
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/List",
	"sap/m/StandardListItem"
	
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Dialog, Button, mobileLibrary, List, StandardListItem) {
        "use strict";
     
        return Controller.extend("iddialogbox.dialogbox.controller.View1", {
            onInit: function () {
                var data=
                { "Products": [
                    {
                        "Name": "Teja",
                        "Age": "23",
                        "Designation": "intern"
                    },
                    {
                        "Name": "Bhuthesh",
                        "Age": "21",
                        "Designation": "fiori"
                    },
                    {
                        "Name": "Sandeep",
                        "Age": "25",
                        "Designation": "employee"
                    }
                ]};
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData(data);
                this.getView().setModel(oModel, "Data1");
                
                // var path=jQuery.sap.getModulePath("iddialogbox.dialogbox","/model/products.json")
                //  let oModel = new sap.ui.model.json.JSONModel(path);
                //   this.getView().setModel(oModel,"Data1");
               
                // var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/products.json"));
                // this.getView().setModel(oModel,"Data1");
            },
            onPress: function () {
                if (!this.oDefaultDialog) {
                    this.oDefaultDialog = new Dialog({
                        title: "Available Products",
                        content: new List({
                            items: {
                                path: "Data1>/Products",
                               
                                template: new StandardListItem({
                                    title: "{Data1>Name}",description:"{Data1>Age}",info:"{Data1>Designation}" ,
                                    type:"Active",
                                    press: function (oEvent) {
                                        var oSelectedItem = oEvent.oSource.mProperties;
    
                                        var oInput = this.byId("employee");
                                        
                                        oInput.setValue(oSelectedItem.title);
                                        //oInput.setValue(oSelectedItem.description);
                                    
                                    }.bind(this)
                                    
                                   
                                })
                               
                             
                            }
                        }),
                        // beginButton: new Button({
                        //     type: ButtonType.Emphasized,
                        //     text: "OK",
                        //     press: function () {
                        //         this.oDefaultDialog.close();
                        //     }.bind(this)
                        // }),
                        endButton: new Button({
                            text: "Close",
                            press: function () {
                                this.oDefaultDialog.close();
                            }.bind(this)
                        })
                    });
    
                    // to get access to the controller's model
                    this.getView().addDependent(this.oDefaultDialog);
                }
    
                this.oDefaultDialog.open();
            }
        });
    });
