sap.ui.define(["sap/ui/core/mvc/Controller",
				"sap/m/MessageBox"], function(Controller, MessageBox) {
	"use strict";
	return Controller.extend("ProductListProductList.controller.View1", {
		/**
		 *@memberOf ProductListProductList.controller.View1
		 */
		handleListItemPress: function(evt) {
			//This code was generated by the layout editor.
			var selectedProductName = evt.getSource().getBindingContext().getProperty("ProductName");
			MessageBox.alert("you have clicked " + selectedProductName);
			
		}
	});
});