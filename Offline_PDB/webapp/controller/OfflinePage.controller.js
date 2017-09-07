var db = new PouchDB('offline_storage');

sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/offline/pdbOffline_PDB/model/models",
	"sap/m/MessageBox"
], function(Controller, models, MessageBox) {
	"use strict";
	return Controller.extend("com.offline.pdbOffline_PDB.controller.OfflinePage", {

		onInit: function() {
			db.changes({
				since: 'now',
				live: true,
				retry: true
			}).on('change', function(info) {
				//MessageBox.alert("Syncing...."); 
				// Call async odata
				//Success - Delete rec from local db
			});
		},
		handleDataStoreOffline: function(oEvent) {
			this.matnum = this.getView().byId("__input0").getValue();
			this.matnumDesc = this.getView().byId("__input1").getValue();
			this.matnumComment = this.getView().byId("__input2").getValue();
			this.structure = {
				'_id': this.matnum,
				'records': [{
					'matnum': this.matnum,
					'matnumDesc': this.matnumDesc,
					'matnumComment': this.matnumComment
				}]
			};
			this.handleStoreDeepStructure(this.structure);
		},
		handleStoreDeepStructure: function(structure) {

			//Adding a record
			db.put(structure).then(function(result) {
				MessageBox.alert("Data saved in local db:" + JSON.stringify(result));

			}).catch(function(err) {
				MessageBox.alert(err);
			});
		},

		handleGetOfflineData: function() {
			db.get("1", function(err, doc) {
				MessageBox.alert("Get Record Object is ready to access");
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

		handleDestroyData: function() {
			this.matnum = this.getView().byId("__input0").getValue();
			db.get(this.matnum, function(err, doc) {
				if (err) {
					return MessageBox.alert(err);
				}
				doc._deleted = true;
				db.put(doc, function(err, response) {
					if (err) {
						return MessageBox.alert(err);
					}
					// handle response
					MessageBox.alert("Data removed from offline db");
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