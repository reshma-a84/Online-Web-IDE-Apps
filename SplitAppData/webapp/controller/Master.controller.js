sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("SplitAppData.controller.Master", {
handleListItemPress: function(evt) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var selectedProductID = evt.getSource().getBindingContext().getProperty("ProductID");
				//ProductID - Property Reference Name from metadata for Products
				oRouter.navTo("productDetail", {
					productId: selectedProductID
				}); //productId - Placeholder assigned to Pattern "product" in manifest.json
			},
		
		handleSearch: function(evt) {
				var aFilters = [];
				//var search_query = evt.getSource().getValue();
			    var search_query = evt.getParameter("query");
			if (search_query && search_query.length > 0) 
			{
				var filter = new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, search_query);
				aFilters.push(filter);
			}
			// update list binding
			var list = this.getView().byId("__list0");
			var binding = list.getBinding("items");
			binding.filter(aFilters);
			
			
		}
	});

});