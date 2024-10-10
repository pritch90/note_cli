#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');

const dir = "/Users/tom.pritchard/tasks"

let actionTime = new Date();

const options = yargs
		.scriptName('task')
		.usage("$0 <cmd> [args]")
		.command('log [description...]', 'Log a task', (yargs) => {
			yargs.positional('description', {
				type: 'string',
				describe: 'The task to log'
			})
		}, function(argv) {
			logTask(argv.description.join(' '));
		})
		.command('show', 'Shows tasks', (yargs) => {

		}, function() {
			showTasks();
		})
		.help()
		.argv;

function getFilename() {
	return `${dir}/${formatDate(actionTime)}.task`
}

function logTask(task) {
	const taskLine = `${actionTime}: ${task}\n`;
	const filename = getFilename();

	fs.appendFileSync(filename, taskLine);

	console.log(`Task "${task}" logged at ${actionTime}`);
}

function formatDate(date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function showTasks() {
	console.log(fs.readFileSync(getFilename()));
}