sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	return Controller.extend("ProdNaviData.controller.View2", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ProdNaviData.view.View2
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("productDetail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
				var oArgs = oEvent.getParameter("arguments");
				var oView = this.getView();
				//oView.bindElement({path:"/Products(5)"});
				oView.bindElement({path:"/Products("+oArgs.productId+")"});
			},
			handleNavButtonPress: function(oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("initial");
			//This code was generated by the layout editor.
		}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf ProdNaviData.view.View2
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf ProdNaviData.view.View2
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf ProdNaviData.view.View2
			 */
			//	onExit: function() {
			//
			//	}
			
		/**
		 *@memberOf ProdNaviData.controller.View2
		 */
		
	});
});