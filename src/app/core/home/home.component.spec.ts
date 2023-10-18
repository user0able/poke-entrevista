import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HomeComponent } from './home.component';
import { PokeapiService } from '@services/pokeapi.service';
import { Pokemon } from '@services/pokeapi.models';
import { MatToolbar } from '@angular/material/toolbar';
import { MaterialModule } from '@shared/material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let matToolbarSpy: jasmine.SpyObj<MatToolbar>;
  let pokeapiServiceSpy: PokeapiService;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    matToolbarSpy = jasmine.createSpyObj('MatToolbar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: PokeapiService },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatToolbar, useValue: matToolbarSpy },
      ],
    }).compileComponents();
    pokeapiServiceSpy = TestBed.inject(PokeapiService);
  });

  it('should be created', () => {
    expect(pokeapiServiceSpy).toBeTruthy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the data source with visible pokemons', () => {
    const pokemonList: Pokemon[] = [
      {
        id: 1,
        order: 1,
        name: 'Bulbasaur',
        weight: 69,
        height: 7,
        visible: true,
        urlDetail: '',
      },
      {
        id: 2,
        order: 2,
        name: 'Ivysaur',
        weight: 130,
        height: 10,
        visible: true,
        urlDetail: '',
      },
      {
        id: 3,
        order: 4,
        name: 'Venusaur',
        weight: 1000,
        height: 20,
        visible: true,
        urlDetail: '',
      },
    ];

    component.ngOnInit();
    component.pokemonList = pokemonList;
    component.dataSource = new MatTableDataSource<Pokemon>(pokemonList);

    expect(component.pokemonList).toEqual(pokemonList);
    component.txtSearch = '';
    component.goSearch();
  });

  it('should filter the data source by name when searching', () => {
    const pokemonList: Pokemon[] = [
      {
        id: 1,
        order: 1,
        name: 'Bulbasaur',
        weight: 69,
        height: 7,
        visible: true,
        urlDetail: '',
      },
      {
        id: 2,
        order: 2,
        name: 'Ivysaur',
        weight: 130,
        height: 10,
        visible: true,
        urlDetail: '',
      },
      {
        id: 3,
        order: 4,
        name: 'Venusaur',
        weight: 1000,
        height: 20,
        visible: true,
        urlDetail: '',
      },
    ];
    component.pokemonList = pokemonList;
    component.dataSource = new MatTableDataSource<Pokemon>(pokemonList);

    component.txtSearch = 'bul';
    component.goSearch();

    expect(component.dataSource.filteredData).toEqual([pokemonList[0]]);
  });

  it('should delete a pokemon and update the data source', () => {
    const pokemonList: Pokemon[] = [
      {
        id: 1,
        order: 1,
        name: 'Bulbasaur',
        weight: 69,
        height: 7,
        visible: true,
        urlDetail: '',
      },
      {
        id: 2,
        order: 2,
        name: 'Ivysaur',
        weight: 130,
        height: 10,
        visible: true,
        urlDetail: '',
      },
      {
        id: 3,
        order: 4,
        name: 'Venusaur',
        weight: 1000,
        height: 20,
        visible: true,
        urlDetail: '',
      },
    ];
    component.pokemonList = pokemonList;
    component.dataSource = new MatTableDataSource<Pokemon>(pokemonList);

    const pokemonToDelete = pokemonList[1];
    component.deletePokemon(pokemonToDelete);

    expect(component.pokemonList).toEqual([
      pokemonList[0],
      { ...pokemonList[1], visible: false },
      pokemonList[2],
    ]);
    expect(component.dataSource.filteredData).toEqual([
      pokemonList[0],
      pokemonList[2],
    ]);
  });

  it('should reset the data source', () => {
    const pokemonList: Pokemon[] = [
      {
        id: 1,
        order: 1,
        name: 'Bulbasaur',
        weight: 69,
        height: 7,
        visible: true,
        urlDetail: '',
      },
      {
        id: 2,
        order: 2,
        name: 'Ivysaur',
        weight: 130,
        height: 10,
        visible: true,
        urlDetail: '',
      },
      {
        id: 3,
        order: 4,
        name: 'Venusaur',
        weight: 1000,
        height: 20,
        visible: true,
        urlDetail: '',
      },
    ];
    component.pokemonList = pokemonList;
    component.dataSource = new MatTableDataSource<Pokemon>(pokemonList);

    component.resetPokemons();

    expect(component.pokemonList).toEqual([
      { ...pokemonList[0], visible: true },
      pokemonList[1],
      pokemonList[2],
    ]);
    expect(component.dataSource.filteredData).toEqual(pokemonList);
  });
});
