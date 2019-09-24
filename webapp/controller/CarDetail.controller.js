sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("Project.Project.controller.CarDetail", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("carDetail").attachPatternMatched(this.onObjectMatched, this);
		},

		onObjectMatched: function (oEvent) {
			var data = JSON.parse(decodeURIComponent(oEvent.getParameter("arguments").Value)); // decodeURIComponent - декодируем данные, которые были переданы на этот view
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			this.getView().setModel(oModel, "Value");
			this.getView().bindElement({
				path: oEvent.getParameter("arguments").Value,
				model: "carDetail"
			});
		},

		onNavBack: function () {
			history.go(-1);
		}

	});

});