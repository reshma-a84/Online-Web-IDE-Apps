sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller,MessageToast) {
	"use strict";

	return Controller.extend("BankAdd.controller.View1", {
		// onInit: function() {
		// 	var oModel = new sap.ui.model.odata.ODataModel("http://117.247.238.162:8072/sap/opu/odata/SAP/Z_odata_BANK1_SRV/");
		// 	this.getView().setModel(oModel);
		// 	},
			
		onAdd: function(evt)
		{
			var oModel = this.getOwnerComponent().getModel();
			var oEntry = {};
			
			oEntry.BankKey = this.getView().byId("bankKey").getValue();
			oEntry.BankName = this.getView().byId("bankName").getValue();
			oEntry.Street = this.getView().byId("street").getValue();
			oEntry.City = this.getView().byId("city").getValue();
			oEntry.State = this.getView().byId("state").getValue();
			oEntry.Country = this.getView().byId("country").getValue();
			oEntry.BankNumber = this.getView().byId("bankNumber").getValue();
			oEntry.Branch = this.getView().byId("branch").getValue();
			oEntry.RoutingNumber = this.getView().byId("routingNumber").getValue();
			
			var mParameters = {};
                  mParameters.success = function(oData,response){
                   MessageToast.show("created successfully");
                   };
                  mParameters.error = function(oData,response){
                  	 MessageToast.show("Create failed");
                      };


			oModel.create('/Banks', oEntry, mParameters);
	
		},
		
		onUpdate: function(evt){
		//	var oView = this.getView();
			var oModel = this.getView().getModel();
		
			var oEntry = {};
				oEntry.BankKey = this.getView().byId("bankKey").getValue();
				oEntry.BankName = this.getView().byId("bankName").getValue();
				oEntry.Street = this.getView().byId("street").getValue();
				oEntry.City = this.getView().byId("city").getValue();
				oEntry.State = this.getView().byId("state").getValue();
				oEntry.Country = this.getView().byId("country").getValue();
				oEntry.BankNumber = this.getView().byId("bankNumber").getValue();
				oEntry.Branch = this.getView().byId("branch").getValue();
				oEntry.RoutingNumber = this.getView().byId("routingNumber").getValue();
			
			var mParameters = {};
                  mParameters.success = function(oData,response){
                   MessageToast.show("Updated successfully");
                   };
                  mParameters.error = function(oData,response){
                  	 MessageToast.show("Update failed");
                      };
                      
			oModel.update("/Banks('"+oEntry.BankKey+"')", oEntry, null, mParameters);
			
		},
		
		 onDelete: function(evt){
			//var oView = this.getView();
			var oModel = this.getView().getModel();
	
			var oEntry = {};
			oEntry.BankKey = this.getView().byId("bankKey").getValue();
			var mParameters = {};
                  mParameters.success = function(oData,response){
                   MessageToast.show("Deleted successfully");
                   };
                  mParameters.error = function(oData,response){
                  	 MessageToast.show("Delete failed");
                  };
                  oModel.remove("/Banks('"+oEntry.BankKey+"')", oEntry, mParameters);
		 }

	
});
});