import { mountApp } from "./mount"

let component_sequence = 1

window.ctrl_omnis_echarts_registry = new Map()

window.ctrl_omnis_echarts = function () {
  this.init_class_inst()
}

window.ctrl_omnis_echarts.prototype = (function () {
  // Omnis Studio Javascript component, built using the JSON defined control editor.

  /****** CONSTANTS ******/
  const EVENTS = {
    evControlEvent: 1
  }

  /** The control prototype - inherited from base class prototype */
  const ctrl = new window.ctrl_base()

  /**
   * class initialization, must be called by constructor
   * this function should initialize class variables
   * IMPORTANT:
   * initialization is separated out from the constructor
   * as the base class constructor is not called when a
   * class is subclassed.
   * all subclass constructors must call their own
   * init_class_inst function which in turn must call the
   * superclass.init_class_inst function
   */
  ctrl.init_class_inst = function () {
    this.controlId = component_sequence
    component_sequence += 1

    // Add this instance to the registry (useful for debugging)
    window.ctrl_omnis_echarts_registry.set(this.controlId, this)

    // install superclass prototype so we can than call superclass methods
    // using this.superclass.method_name.call(this[,...])
    this.superclass = window.ctrl_base.prototype

    // call our superclass class initializer
    this.superclass.init_class_inst.call(this)
  }

  /**
   * Initializes the control instance from element attributes.
   * Must be called after control is constructed by the constructor.
   * @param form      Reference to the parent form.
   * @param elem      The html element the control belongs to.
   * @param rowCtrl   Pointer to a complex grid control if this control belongs to a cgrid.
   * @param rowNumber The row number this control belongs to if it belongs to a cgrid.
   * @returns {boolean}   True if the control is a container.
   */
  ctrl.init_ctrl_inst = function (form, elem, rowCtrl, rowNumber) {
    const controlId = this.controlId

    // call our superclass init_ctrl_inst
    this.superclass.init_ctrl_inst.call(this, form, elem, rowCtrl, rowNumber)

    // Mount Vue app on Client Element provided by Omnis
    // Control-specific initialization:
    const client_elem = this.getClientElem()

    //Add click event handler:
    client_elem.onclick = this.mEventFunction

    // Mount the Vue app to the provided element
    mountApp(controlId, client_elem)

    // Now that the Vue app has been mounted, retrieve the hooks so the event emitter can be
    // setup and the
    const hooks = window.ctrl_omnis_echarts_hooks.get(controlId)

    // Setup event hook
    hooks.emitEvent = ctrl.emitEvent

    // Set new hooks for this control
    window.ctrl_omnis_echarts_hooks.set(controlId, hooks)

    // Now that everything is set up call the onLoad hook.
    hooks.onLoad()

    this.update()

    // return true if our control is a container and the
    // children require installing via this.form.InstallChildren
    return false
  }

  ctrl.emitEvent = function (omnisEvent) {
    console.log("Emit!", omnisEvent)
    if (this.canSendEvent(EVENTS.evControlEvent)) {
      this.eventParamsAdd("pEvent", omnisEvent["event"])
      this.eventParamsAdd("pPayload", JSON.stringify(omnisEvent["payload"]))
      this.sendEvent("evControlEvent")
    }
  }

  /**
   * The control's data has changed. The contents may need to be updated.
   *
   * @param {String} what    Specifies which part of the data has changed:
   *                 ""              - The entire data has changed
   *                 "#COL"          - A single column in the $dataname list (specified by 'row' and 'col') or a row's column (specified by 'col')
   *                 "#LSEL"         - The selected line of the $dataname list has changed (specified by 'row')
   *                 "#L"            - The current line of the $dataname list has changed  (specified by 'row')
   *                 "#LSEL_ALL"     - All lines in the $dataname list have been selected.
   *                 "#NCELL"        - An individual cell in a (nested) list. In this case, 'row' is an array of row & column numbers.
   *                                  of the form "row1,col1,row2,col2,..."
   *
   * @param {Number} row             If specified, the row number in a list (range = 1..n) to which the change pertains.
   *                                 If 'what' is "#NCELL", this must be an array of row and col numbers. Optionally, a modifier may be
   *                                 added as the final array element, to change which part of the nested data is to be changed. (Currently only "#L" is supported)
   *
   * @param {Number|String} col      If specified, the column in a list row (range = 1..n or name) to which the change pertains.
   */
  ctrl.updateCtrl = function (what, row, col, mustUpdate) {
    const controlId = this.controlId

    const elem = this.getClientElem()

    // center the text vertically:
    elem.style.lineHeight = elem.style.height
    elem.style.textAlign = "center"

    // Set new data on the component
    const hooks = window.ctrl_omnis_echarts_hooks.get(controlId)

    const data = this.getData()
    if (this.mData != data) {
      this.mData = data
      hooks.setData(data)
    }
  }

  /**
   * Adds a click handler if the device doesn't support touch, or equivalent touch handlers if it does.
   * @param elem Element to add a click/touch handler to
   */
  ctrl.addClickHandlers = function (elem) {
    if (!this.usesTouch) {
      elem.onclick = this.mEventFunction
    } else {
      elem.ontouchstart = this.mEventFunction
      elem.ontouchend = this.mEventFunction
    }
  }

  /**
   * This is called when an event registered using this.mEventFunction() is triggered.
   *
   * @param event The event object
   */
  ctrl.handleEvent = function (event) {
    if (!this.isEnabled()) return true // If the control is disabled, don't process the event.
    return this.superclass.handleEvent.call(this, event) //Let the superclass handle the event, if not handled here.
  }

  /**
   * Called to get the value of an Omnis property
   *
   * @param propNumber    The Omnis property number
   * @returns {var}       The property's value
   */
  ctrl.getProperty = function (propNumber) {
    return this.superclass.getProperty.call(this, propNumber) //Let the superclass handle it,if not handled here.
  }

  /**
   * Function to get $canassign for a property of an object
   * @param propNumber    The Omnis property number
   * @returns {boolean}   Whether the passed property can be assigned to.
   */
  ctrl.getCanAssign = function (propNumber) {
    return this.superclass.getCanAssign.call(this, propNumber) // Let the superclass handle it,if not handled here.
  }

  /**
   * Assigns the specified property's value to the control.
   * @param propNumber    The Omnis property number
   * @param propValue     The new value for the property
   * @returns {boolean}   success
   */
  ctrl.setProperty = function (propNumber, propValue) {
    if (!this.getCanAssign(propNumber))
      // check whether the value can be assigned to
      return false
    return this.superclass.setProperty.call(this, propNumber, propValue) // Let the superclass handle it, if not handled here.
  }

  /**
   * Called when the size of the control has changed.
   */
  ctrl.sizeChanged = function () {
    this.superclass.sizeChanged()

    // center any text vertically
    const elem = this.getClientElem()
    elem.style.lineHeight = elem.style.height
  }

  return ctrl
})()
