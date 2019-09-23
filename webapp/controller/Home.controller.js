sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"jquery.sap.global",
	"sap/m/MessageBox",
	"sap/ui/model/Filter"
], function (Controller, JSONModel, jQuery, MessageBox, Filter) {
	"use strict";

	return Controller.extend("Project.Project.controller.Home", {
		onInit: function () {
			// mock model
			var sPath = sap.ui.require.toUrl("Project/Project/model") + "/cars.json";
			var oModel = new JSONModel(sPath);
			this.getView().setModel(oModel);
		},
		//переход на вторую страницу
		ToDetailPage: function () {
    		this.getOwnerComponent().getRouter().navTo("detail");
		},
		ToTablePage : function () {
    		this.getOwnerComponent().getRouter().navTo("table");
		},
		
	
		// выводится messagebox с информацией выбранной строки
		onClick: function (oEvent) {
			/*var oSelectedItem = oEvent.getParameter("listItem");
          var oModel = oSelectedItem.getBindingContext().getObject();
          MessageBox.show(JSON.stringify(oModel)*/
			var selectedCar = oEvent.getParameter("listItem");
			var brandName = selectedCar.getBindingContext().getProperty("Brand");
			var modelName = selectedCar.getBindingContext().getProperty("Model");
			var descName = selectedCar.getBindingContext().getProperty("Description");
			
				MessageBox.show("\nBrand: " + brandName + "\nModel: " + modelName + "\nDescription: " + descName, {
					title: "Selected Car"
				});
		},
		// фильтр по бренду
		onSearch : function (oEvt) {
        var aFilters = [];
        var sQuery = oEvt.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
            var filter = new Filter("Brand", sap.ui.model.FilterOperator.Contains, sQuery);
            aFilters.push(filter);
        }
        var list = this.getView().byId("tab1");
        var binding = list.getBinding("items");
        binding.filter(aFilters, "Application");
	} 
	});
});