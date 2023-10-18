import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pokemon } from '@services/pokeapi.models';
import { PokeapiService } from '@services/pokeapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pokemonList: Pokemon[] = [];
  displayedColumns: string[] = ['id', 'name', 'weight', 'height', 'actions'];
  dataSource!: MatTableDataSource<Pokemon>;
  txtSearch = '';

  constructor(private poke$: PokeapiService) {}

  ngOnInit() {
    this.poke$.listPokemonResults().subscribe({
      next: (data) => {
        this.pokemonList = data;
        this.dataSource = new MatTableDataSource<Pokemon>(
          this.pokemonList.filter((p) => p.visible)
        );
      },
      error: (err) => console.log(err),
      complete: () => {
        this.setAttrsTable();
      },
    });
  }

  setAttrsTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.goSearch();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.setAttrsTable();
    }
  }

  goSearch() {
    this.dataSource.filter = this.txtSearch.trim().toLowerCase();
  }

  deletePokemon(pokemon: Pokemon) {
    const pokemonFound = this.pokemonList.find((p) => p.id === pokemon.id);
    if (pokemonFound) {
      pokemonFound.visible = false;
      this.dataSource = new MatTableDataSource<Pokemon>(
        this.pokemonList.filter((p) => p.visible)
      );
      this.setAttrsTable();
    }
  }

  resetPokemons() {
    this.dataSource = new MatTableDataSource<Pokemon>(this.pokemonList);
    this.setAttrsTable();
  }
}
