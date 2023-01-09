if (false) require('google-apps-script');

/**
 * Checks the range where the event was triggered and routes to the corresponding callback.
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e The Event Object
 * @returns {void}
 */
function onEdit(e) {
  const { range } = e;
  const col = range.getColumn();
  const callback = route(col);
  if (null === callback) {
    console.log('Exiting as the event happened out of the range');
    return;
  }
  return callback(e);
}

/**
 * Matches the column number to the corresponding function
 * @param {number} col The column number
 * @returns {Function | null} The function corresponding to the column or null if none is found
 */
function route(col) {
  const routes = new Map([
    [1, markAsDone],
    [2, addNewTask],
  ]);
  return routes.get(col) || null;
}

/**
 * Retrieves the last row number of the sheet where the event was triggered
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e The Event Object
 * @returns {number} The number of the last row
 */
function getLastRow(e) {
  return e.range.getSheet().getLastRow();
}

/**
 * Marks a task as done on a given row
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e The Event Object
 */
function markAsDone(e) {
  const ws = e.range.getSheet();
  const values = ws.getDataRange().getValues();
  const statuses = values.map(row => [row[0]]).slice(1);
  const dates = values
    .map(row => [row[2]])
    .slice(1)
    .map((date, i) => {
      const status = statuses[i][0];
      if ('' !== (date + '').trim() && true === status) return date;
      return true === status ? [new Date().toISOString()] : [''];
    });
  ws.getRange(2, 3, ws.getLastRow() - 1, 1).setValues(dates);
}

/**
 * Creates a new task on a given row
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e The Event Object
 */
function addNewTask(e) {
  const ws = e.range.getSheet();
  const lastRow = ws.getLastRow();
  ws.getRange(2, 1, lastRow - 1, 1).insertCheckboxes();
}
