sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("Project.Project.controller.Detail", {
		onInit: function () {
		
		},
		
		// передача параметров в carDetail.view
	onSelectionChange: function(oEvent) {
			var NameValue = oEvent.getSource().getBindingContext().getProperty("carName");
			var BranValue = oEvent.getSource().getBindingContext().getProperty("Brand");
			var ModelValue = oEvent.getSource().getBindingContext().getProperty("Model");
			var PowerValue = oEvent.getSource().getBindingContext().getProperty("Power");
			var ColorValue = oEvent.getSource().getBindingContext().getProperty("Color");
			var DescriptionValue = oEvent.getSource().getBindingContext().getProperty("Description");
			var PriceValue = oEvent.getSource().getBindingContext().getProperty("Price");
			var PictureValue = encodeURIComponent(oEvent.getSource().getBindingContext().getProperty("Picture")); // encodeURIComponent - кодируем символ слэша в url картинок
			var data = { carName : NameValue, Brand : BranValue, Model : ModelValue, Power : PowerValue, Color : ColorValue, Description : DescriptionValue, Price : PriceValue, Picture:PictureValue};
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("carDetailPage", { Value: JSON.stringify(data)});
		},
		

		
	//	переход на предыдущую страницу
	
		ToMainPage: function () {
		history.go(-1);
		}
		
	});

});