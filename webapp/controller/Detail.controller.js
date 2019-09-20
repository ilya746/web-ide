sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("Project.Project.controller.Detail", {
		onInit: function () {
		
		},
		
		onSelectionChange: function(oEvent) {
	
			var NameValue = oEvent.getSource().getBindingContext().getProperty("carName");
			var BranValue = oEvent.getSource().getBindingContext().getProperty("Brand");
			var ModelValue = oEvent.getSource().getBindingContext().getProperty("Model");
			var PowerValue = oEvent.getSource().getBindingContext().getProperty("Power");
			var ColorValue = oEvent.getSource().getBindingContext().getProperty("Color");
			var DescriptionValue = oEvent.getSource().getBindingContext().getProperty("Description");
			var PriceValue = oEvent.getSource().getBindingContext().getProperty("Price");
			var PictureValue = oEvent.getSource().getBindingContex().getProperty("Picture").toString();
			var data = { carName : NameValue, Brand : BranValue, Model : ModelValue, Power : PowerValue, Color : ColorValue, Description : DescriptionValue, Price : PriceValue};
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("carDetail", { Value: JSON.stringify(data)});
		},
		
		/*
		переход на предыдущую страницу
		*/
		ToMainPage: function () {
		history.go(-1);
		}
		
	});

});