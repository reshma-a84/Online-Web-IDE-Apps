var db = new PouchDB('offline_storage');
var oModel;
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/offline/pdbOffline_PDB/model/models",
	"sap/m/MessageBox", "sap/m/MessageToast",
], function(Controller, models, MessageBox, MessageToast) {
	"use strict";
	return Controller.extend("com.offline.pdbOffline_PDB.controller.OfflinePage", {

		onInit: function() {
			let url = "/sap/opu/odata/SAP/Z_odata_BANK1_SRV/";
			var that = this;
			db.changes({
				since: 'now',
				live: true,
				retry: true
			}).on('change', function(info) {
				//that.handleGetOfflineData(info.id);
			});
			oModel = new sap.ui.model.odata.ODataModel(url, true, 'reshma', 'welcome123');
		},
		handleDataStoreOffline: function(oEvent) {
			var oEntry = {};
			oEntry.BankKey = this.getView().byId("__input0").getValue();
			oEntry.BankName = this.getView().byId("__input1").getValue();
			oEntry.Street = this.getView().byId("__input2").getValue();
			oEntry.City = this.getView().byId("__input3").getValue();
			oEntry.State = this.getView().byId("__input4").getValue();
			oEntry.Country = this.getView().byId("__input5").getValue();
			oEntry.BankNumber = this.getView().byId("__input6").getValue();
			oEntry.Branch = this.getView().byId("__input7").getValue();
			oEntry.RoutingNumber = this.getView().byId("__input8").getValue();
			//Offline code intergration
			this.structure = {
				'_id': oEntry.BankKey,
				'oEntry' : oEntry,
				'records': [{
					'BankKey': oEntry.BankKey,
					'BankName': oEntry.BankName,
					'Street': oEntry.Street,
					'City': oEntry.City,
					'State': oEntry.State,
					'Country': oEntry.Country,
					'BankNumber': oEntry.BankNumber,
					'Branch': oEntry.Branch,
					'RoutingNumber': oEntry.RoutingNumber
				}]

			};
			this.handleStoreDeepStructure(this.structure);
		

		},
		handleForeGroundOfflineUpdate: function() {
			var options = {};
			var that = this;
			options.include_docs = true;
			options.attachments = true;
			db.allDocs(options, function(error, response) {
				var row = response.rows; // Calls an addrow() function
				$.each(row,function(key,value){
				value = value.doc.oEntry;
				that.handleOdataServiceCall(value);
				});
				
			});
		},
		handleOdataServiceCall: function(add_entry) {
			var mParameters = {};
			var that  = this;
			mParameters.success = function(oData, response) {
				MessageToast.show("created successfully");
				that.handleDestroyData(response.data.BankKey);
			};
			mParameters.error = function(oData, response) {
				MessageToast.show("Create failed");
			};
			oModel.create('/Banks', add_entry, mParameters);
		},
		handleStoreDeepStructure: function(structure) {
			var that = this;
			//Adding a record
			db.put(structure).then(function(result) {
				MessageToast.show("Data saved in local db, started moving to SAP");
				
			}).catch(function(err) {
				MessageBox.alert(err);
			});
		},

		handleGetOfflineData: function(Key) {
			var that = this;
			db.get(Key, function(err, doc) {
				that.handleOdataServiceCall(doc.oEntry);
			});
		},

		handleGetAllRecords: function() {
			var options = {};
			options.include_docs = true;
			options.attachments = true;
			var that = this.getView().byId('__list0');
			db.allDocs(options, function(error, response) {
				var row = response.rows; // Calls an addrow() function
				that.setModel(models.createOfflineModel(row), "OfflineData");
			});
		},
		handleDestroyAllRec: function() {
			db.allDocs().then(function(result) {
				return Promise.all(result.rows.map(function(row) {
					return db.remove(row.id, row.value.rev);
				}));
			}).then(function() {
				// done!
				MessageBox.alert('All recorded deleted');
			}).catch(function(err) {
				// error!
				MessageBox.alert(err);
			});
		},

		handleUpdateOfflineData: function() {
			this.matnum = this.getView().byId("__input0").getValue();
			this.matnumDesc = this.getView().byId("__input1").getValue();
			this.matnumComment = this.getView().byId("__input2").getValue();
			var that = this;
			//Update a record
			db.get(this.matnum, function(err, doc) {
				if (err) {
					return MessageBox.alert(err);
				}
				doc.records[0].matnumDesc = that.matnumDesc;
				doc.records[0].matnumComment = that.matnumComment;
				db.put(doc, function(err, response) {
					if (err) {
						return MessageBox.alert(err);
					}

					MessageBox.alert("Successfully updates!!!.");
					// handle response
				});
			});
		},

		handleDestroyData: function(bankKey) {
			var that = this;
			db.get(bankKey, function(err, doc) {
				if (err) {
					return MessageBox.alert(err);
				}
				doc._deleted = true;
				db.put(doc, function(err, response) {
					if (err) {
						return MessageBox.alert(err);
					}
					// handle response
					MessageBox.alert("Data created in SAP, removed from offline db");
					//Update
					that.handleGetAllRecords();
				});
			});
		},
		handleSync: function() {
			//sync.cancel(); // whenever you want to cancel
		},
		handleSegmentedButton: function(oEvent) {
			if (oEvent.getSource().getSelectedButton() != "__xmlview0--__button5") {
				this.getView().byId('__vbox0').setVisible(false);
				this.getView().byId('__vbox1').setVisible(true);
				this.handleGetAllRecords();
			} else {
				this.getView().byId('__vbox1').setVisible(false);
				this.getView().byId('__vbox0').setVisible(true);
			}

		}
	});
});