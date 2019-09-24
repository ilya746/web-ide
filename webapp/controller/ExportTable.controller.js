sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/core/util/MockServer",
	"sap/ui/export/Spreadsheet",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Controller, MockServer, ODataModel, Spreadsheet, JSONModel, Export, ExportCSV) {
	"use strict";

	return Controller.extend("Project.Project.controller.ExportTable", {

		onInit: function () {
			var sPath = sap.ui.require.toUrl("Project/Project/model") + "/cars.json";
			var oModel = new JSONModel(sPath);
			this.getView().setModel(oModel, "carModel");
		},

		//действие кнопки назад
		onNavBack: function () {
			history.go(-1);
		},

		// экспорт данных таблицы
		handleExcelExport: function () {
			// getting model into oModel variable.
			//var oModel = this.getView().getModel("carModel");
			var oExport = new Export({
				exportType: new ExportCSV({
					// for xls....
					fileExtension: "xls",
					separatorChar: "\t",
					charset: "utf-8",
					mimeType: "application/vnd.ms-excel"

					// for CSV....
					/*
					charset: "utf-8",
					fileExtension:"txt",
					separatorChar:",",
					mimeType:"application/txt" 
					*/
				}),
				models: this.getView().getModel("carModel"),
				rows: {
					path: "/CarCollection"
				},
				columns: [{
					name: "Название",
					template: {
						content: "{carName}"
					}
				}, {
					name: "Марка",
					template: {
						content: "{Brand}"
					}
				}, {
					name: "Модель",
					template: {
						content: "{Model}"
					}
				}, {
					name: "Описание",
					template: {
						content: "{Description}"
					}
				}]
			});
			oExport.saveFile().catch(function (oError) {
				sap.m.MessageToast.show("Экспорт невозможен. Не установлена модель.");
			}).then(function () {
				oExport.destroy();
			});
		},

		onExit: function () {
			this._oMockServer.stop();
		}

	});

});