sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/m/MessageToast"], 
function(Controller, MessageBox, MessageToast) {
	"use strict";
	return Controller.extend("SplitAppData.controller.Detail", 
	
	{
	onInit: function() {
		/* this.getOwnerComponent().getRouter().getRoute("orderDetails").attachPatternMatched(this._onRouteMatched, this);*/
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("productDetail").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var oView = this.getView();
			//oView.bindElement({path:"/Products(5)"});
			oView.bindElement({
				path: "/Products(" + oArgs.productId + ")"
			});
		},
		handleNavButtonPress: function(oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("initial"); //This code was generated by the layout editor.
			},
		handleOrderPress: function(oEvent) {
			
			var textBundle = this.getView().getModel("i18n").getResourceBundle();
			
			MessageBox.confirm(textBundle.getText("placeOrder"), {
    			title: textBundle.getText("confirmOrder"),                                    // default
    			onClose: this._onCloseMessage
    });
			 
			//This code was generated by the layout editor.
		},
		_onCloseMessage: function(oEvent){
		//	var textBundle = this.getView().getModel("i18n").getResourceBundle();
			if(MessageBox.Action.OK === oEvent){
				//MessageToast.show(textBundle.getText("orderPlaced"));
				MessageToast.show("Your order has been placed");
			}
		}

	});

});