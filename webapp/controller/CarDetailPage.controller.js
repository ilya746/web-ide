sap.ui.define([
		"jquery.sap.global",
		"sap/ui/core/Fragment",
	    "sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
], function (jQuery, Fragment, Controller, JSONModel) {
	"use strict";

	return Controller.extend("Project.Project.controller.CarDetailPage", {

		
			onInit : function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("carDetailPage").attachPatternMatched(this.onObjectMatched, this);
			},
	
		onObjectMatched: function (oEvent) {
			var data = JSON.parse(decodeURIComponent(oEvent.getParameter("arguments").Value));  // decodeURIComponent - декодируем данные, которые были переданы на этот view
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(data);
			oModel.attachRequestCompleted(function() {
				this.byId("edit").setEnabled(true);
			}.bind(this));
			this.getView().setModel(oModel, "Value");
			this.getView().bindElement({path:oEvent.getParameter("arguments").Value, model: "carDetailPage"});
			this._showFormFragment("DisplayCarDetail");
	
		},
		onExit : function () {
			for (var sPropertyName in this._formFragments) {
				if (!this._formFragments.hasOwnProperty(sPropertyName) || this._formFragments[sPropertyName] === null) {
					return;
				}

				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},

		handleEditPress : function () {

			//Clone the data
			this._oSupplier = jQuery.extend({}, this.getView().getModel().getData());
			this._toggleButtonsAndView(true);
		},

		handleCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.CarCollection[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);

		},

		handleSavePress : function () {
			this._toggleButtonsAndView(false);
		},

		_formFragments: {},
		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "ChangeCarDetail" : "DisplayCarDetail");
		},
		
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "Project.Project.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		
		_showFormFragment : function (sFragmentName) {
		var oPage = this.byId("CarDetailPage");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	
	});

});