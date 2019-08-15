import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleChartsModule } from 'angular-google-charts';
import { By } from '@angular/platform-browser';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [RouterTestingModule, GoogleChartsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no chart by default', () => {
    const debugElement = fixture.debugElement.query(By.css('google-chart'));

    expect(debugElement).toBeNull();
  });

  it('test chart default data', () => {
    expect(component.chart.title).toEqual('');
    expect(component.chart.type).toEqual('LineChart');
    expect(component.chart.data).toEqual([]);
    expect(component.chart.columnNames).toEqual(['period', 'close']);
    expect(component.chart.options).toEqual({ title: `Stock price`, width: '600', height: '400' });
  });

  it('render chart with data', () => {
    component.data = [[["2019-07-05", 204.26]]];
    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('google-chart'));

    expect(debugElement).toBeDefined();
  });

  it('show helper text when no data', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('div').textContent).toContain(
      'Please select a valid time period'
    );
  });
});
