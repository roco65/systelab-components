import { Component, ViewChild } from '@angular/core';
import { addMonths, addYears } from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { DialogRef, ModalComponent, SystelabModalContext } from '../modal';
import { CalendarTableComponent, DaySlot } from './calendar-table.component';
import { I18nService } from 'systelab-translate/lib/i18n.service';

export class CalendarDialogParameters extends SystelabModalContext {

	public width = 800;
	public height = 600;
	public headerDescription = '';
}

@Component({
	templateUrl: 'calendar-dialog.component.html',
	styleUrls:   ['calendar-dialog.component.scss']

})
export class CalendarDialog implements ModalComponent<CalendarDialogParameters> {

	@ViewChild('calendar') calendar: CalendarTableComponent;

	public parameters: CalendarDialogParameters;
	public currentDate: Date;
	public days: DaySlot[] = [];

	constructor(public dialog: DialogRef<CalendarDialogParameters>, private i18nService: I18nService) {
		this.parameters = dialog.context;
		this.currentDate = new Date();
		this.getData();
	}

	public close(): void {
		this.dialog.close();
	}

	public selectDaySlot(daySlot: DaySlot) {
		if (daySlot.date) {
			this.close();
		}
	}

	public static getParameters(): CalendarDialogParameters {
		return new CalendarDialogParameters();
	}

	public doSomething(data: any) {
		console.log(data);
	}

	public changeYear(yearFactor: number): void {
		this.days = [];
		this.currentDate = addYears(this.currentDate, yearFactor);
		this.getData();
	}

	public changeMonth(monthFactor: number): void {
		this.days = [];
		this.currentDate = addMonths(this.currentDate, monthFactor);
		this.getData();
	}

	private getData() {
		Observable.of(true)
			.delay(1000)
			.subscribe(
				(response) => {
					const returnedDays: DaySlot[] = [];
					returnedDays.push({date: new Date(2017, 10, 25), day: 25, isHoliday: true});
					returnedDays.push({date: new Date(2017, 10, 26), day: 26, isHoliday: true});
					this.days = returnedDays;
				}
			);
	}

}

