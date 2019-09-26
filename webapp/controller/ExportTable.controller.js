sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/core/util/MockServer",
	"sap/ui/export/Spreadsheet",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	"sap/ui/core/Fragment"
], function (Controller, MockServer, ODataModel, Spreadsheet, JSONModel, Export, ExportCSV, Fragment) {
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
					name: "Name",
					template: {
						content: "{carName}"
					}
				}, {
					name: "Brand",
					template: {
						content: "{Brand}"
					}
				}, {
					name: "Model",
					template: {
						content: "{Model}"
					}
				}, {
					name: "Description",
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
		onOpenCarCollection: function (oEvent) {
			var oButton = oEvent.getSource();
			// create popover
			if (!this._oPopover) {
				Fragment.load({
					id: "popoverNavCon",
					name: "Project.Project.view.CarCollectionList",
					controller: this
				}).then(function (oPopover) {
					this._oPopover = oPopover;
					this.getView().addDependent(this._oPopover);
					this._oPopover.openBy(oButton);
				}.bind(this));
			} else {
				this._oPopover.openBy(oButton);
			}
		},
		onNavToCar: function (oEvent) {
			var oCtx = oEvent.getSource().getBindingContext();
			var oNavCon = Fragment.byId("popoverNavCon", "navCon");
			var oDetailPage = Fragment.byId("popoverNavCon", "detail");
			oNavCon.to(oDetailPage);
			oDetailPage.bindElement(oCtx.getPath());
			this._oPopover.focus();
		},

		onNavBackList: function (oEvent) {
			var oNavCon = Fragment.byId("popoverNavCon", "navCon");
			oNavCon.back();
			this._oPopover.focus();
		},

		onExit: function () {
			this._oMockServer.stop();
		}
	});

});