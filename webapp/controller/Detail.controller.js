sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("Project.Project.controller.Detail", {
		onInit: function () {
		
		},
		
		onSelectionChange: function(oEvent) {
			
 		var oTable = oEvent.getSource().getSelectedItem().getBindingContext("detail");
  var Row = oTable.oModel.getProperty(oTable.sPath);
			
			
		/*	var titleName = oEvent.getSource().getBindingContext().getProperty("carName");
			var BrandName = oEvent.getSource().getBindingContext().getProperty("Brand");
			var ModelName = oEvent.getSource().getBindingContext().getProperty("Model");
			var Power = oEvent.getSource().getBindingContext().getProperty("Power");
			var data = { carName : titleName, Brand: BrandName, Model: ModelName, Power: Power};*/
	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	oRouter.navTo("carDetail", { Value: JSON.stringify(Row)
	});
		},
		
		/*
		переход на предыдущую страницу
		*/
		ToMainPage: function () {
		history.go(-1);
		}
		
	});

});