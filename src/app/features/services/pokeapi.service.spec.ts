import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PokeapiService } from './pokeapi.service';
import { HttpClientModule } from '@angular/common/http';
import { Pokemon, ResponseList, Result } from './pokeapi.models';

describe('PokeapiService', () => {
  let service: PokeapiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(PokeapiService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeapiService],
    });
    service = TestBed.inject(PokeapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemonDetails', () => {
    it('should return an Observable<Pokemon>', () => {
      const mockUrl = 'https://pokeapi.co/api/v2/pokemon/25';
      const mockPokemon: Pokemon = {
        name: 'Pikachu',
        id: 25,
        height: 4,
        weight: 60,
        order: 35,
        visible: false,
        urlDetail: mockUrl,
      };

      service.getPokemonDetails(mockUrl).subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
      });

      const req = httpMock.expectOne(mockUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });
  });
});

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeapiService],
    });
    service = TestBed.inject(PokeapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemonList', () => {
    it('should return an Observable<ResponseList<Result[]>>', () => {
      const mockResponse: ResponseList<Result[]> = {
        count: 151,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=151&limit=151',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      service.getPokemonList().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });
      const apiURL = 'https://pokeapi.co/api/v2';
      const req = httpMock.expectOne(`${apiURL}/pokemon/?limit=151`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});

describe('PokeapiService', () => {
  let service: PokeapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeapiService],
    });
    service = TestBed.inject(PokeapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('listPokemonResults', () => {
    it('should return an Observable<Pokemon[]>', () => {
      const mockResponse: ResponseList<Result[]> = {
        count: 2,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=151&limit=151',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };
      const mockPokemon1: Pokemon = {
        name: 'bulbasaur',
        id: 1,
        height: 7,
        weight: 69,
        order: 1,
        visible: true,
        urlDetail: 'https://pokeapi.co/api/v2/pokemon/1/',
      };
      const mockPokemon2: Pokemon = {
        name: 'ivysaur',
        id: 2,
        height: 10,
        weight: 130,
        order: 2,
        visible: true,
        urlDetail: 'https://pokeapi.co/api/v2/pokemon/2/',
      };

      service.listPokemonResults().subscribe((pokemons) => {
        expect(pokemons).toEqual([mockPokemon1, mockPokemon2]);
      });

      const req = httpMock.expectOne(
        'https://pokeapi.co/api/v2/pokemon/?limit=151'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1/');
      expect(req1.request.method).toBe('GET');
      req1.flush(mockPokemon1);

      const req2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/2/');
      expect(req2.request.method).toBe('GET');
      req2.flush(mockPokemon2);
    });

    it('should set the LIST_POKEMON property', () => {
      const mockResponse: ResponseList<Result[]> = {
        count: 2,
        next: 'https://pokeapi.co/api/v2/pokemon/?offset=151&limit=151',
        previous: null,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };
      const mockPokemon1: Pokemon = {
        name: 'bulbasaur',
        id: 1,
        height: 7,
        weight: 69,
        order: 1,
        visible: true,
        urlDetail: 'https://pokeapi.co/api/v2/pokemon/1/',
      };
      const mockPokemon2: Pokemon = {
        name: 'ivysaur',
        id: 2,
        height: 10,
        weight: 130,
        order: 2,
        visible: true,
        urlDetail: 'https://pokeapi.co/api/v2/pokemon/2/',
      };

      service.listPokemonResults().subscribe(() => {
        expect(service.LIST_POKEMON).toEqual([mockPokemon1, mockPokemon2]);
      });

      const req = httpMock.expectOne(
        'https://pokeapi.co/api/v2/pokemon/?limit=151'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1/');
      expect(req1.request.method).toBe('GET');
      req1.flush(mockPokemon1);

      const req2 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/2/');
      expect(req2.request.method).toBe('GET');
      req2.flush(mockPokemon2);
    });
  });
});
