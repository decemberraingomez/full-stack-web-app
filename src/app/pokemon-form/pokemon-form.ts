import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  styleUrl: './pokemon-form.css',
  templateUrl: './pokemon-form.html',
})
export class PokemonForm implements OnInit {
  private fb = inject(FormBuilder);
  protected pokemonService = inject(Pokemon);

  protected pokemonForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: [1, [Validators.required, Validators.min(1)]],
    nature: ['', Validators.required],
  });

  ngOnInit() {
    this.pokemonService.fetchPokemon();
  }

  onSubmit() {
    if (this.pokemonForm.invalid) {
      console.warn('Form invalid', this.pokemonForm.errors, this.pokemonForm.value);
      return;
    }

    this.pokemonService.savePokemon(this.pokemonForm.getRawValue()).subscribe({
      next: (saved) => {
        console.log('Saved:', saved);
        this.pokemonService.fetchPokemon();
        this.pokemonForm.reset();
      },
      error: (err) => console.error('Save failed', err),
    });
  }
}