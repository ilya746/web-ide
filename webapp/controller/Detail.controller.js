sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("Project.Project.controller.Detail", {
		onInit: function () {
		
		},
		/*
		переход на предыдущую страницу
		*/
		ToMainPage: function () {
		history.go(-1);
		}
	});

});