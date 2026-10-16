import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds a trimmed task and ignores empty input', () => {
    component.objectifText = '  Réviser Angular  ';
    component.ajoutItem();
    component.objectifText = '   ';
    component.ajoutItem();
    expect(component.objectifs).toEqual(['Réviser Angular']);
    expect(component.nbItems).toBe(1);
  });

  it('updates a task without adding a second task', () => {
    component.objectifs = ['Ancienne tâche'];
    component.modifierItem(0);
    expect(component.objectifText).toBe('Ancienne tâche');
    component.objectifText = ' Nouvelle tâche ';
    component.ajoutItem();
    expect(component.objectifs).toEqual(['Nouvelle tâche']);
    expect(component.indexModification).toBeNull();
    expect(component.objectifText).toBe('');
  });

  it('cancels editing without changing the task', () => {
    component.objectifs = ['À conserver'];
    component.modifierItem(0);
    component.objectifText = 'Brouillon';
    component.annulerModification();
    expect(component.objectifs).toEqual(['À conserver']);
    expect(component.indexModification).toBeNull();
    expect(component.objectifText).toBe('');
  });

  it('keeps editing the correct task after deleting an earlier task', () => {
    component.objectifs = ['Première', 'Deuxième', 'Troisième'];
    component.modifierItem(2);
    component.supprimerItem(0);
    component.objectifText = 'Troisième modifiée';
    component.ajoutItem();
    expect(component.objectifs).toEqual(['Deuxième', 'Troisième modifiée']);
    expect(component.nbItems).toBe(2);
  });

  it('cancels editing when the edited task is deleted', () => {
    component.objectifs = ['À supprimer'];
    component.modifierItem(0);
    component.supprimerItem(0);
    expect(component.nbItems).toBe(0);
    expect(component.indexModification).toBeNull();
    expect(component.objectifText).toBe('');
  });

  it('selects a task to fill the form and reveal the edit and delete actions', async () => {
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector('input')!;
    expect(element.querySelector('form .delete')).toBeNull();
    expect(element.querySelector('button[type="submit"]')?.textContent?.trim()).toBe('Créer');
    input.value = 'Nouvelle tâche';
    input.dispatchEvent(new Event('input'));
    element.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(element.querySelector('.life-container span')?.textContent).toBe('Nouvelle tâche');
    (element.querySelector('.life-container') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(input.value).toBe('Nouvelle tâche');
    expect(element.querySelector('button[type="submit"]')?.textContent?.trim()).toBe('Modifier');
    expect(element.querySelector('form .delete')).not.toBeNull();
    input.value = 'Tâche modifiée';
    input.dispatchEvent(new Event('input'));
    element.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(element.querySelector('.life-container span')?.textContent).toBe('Tâche modifiée');
    expect(element.querySelector('form .delete')).toBeNull();
    (element.querySelector('.life-container') as HTMLButtonElement).click();
    await fixture.whenStable();
    (element.querySelector('form .delete') as HTMLButtonElement).click();
    await fixture.whenStable();
    expect(element.querySelector('.life-container')).toBeNull();
    expect(element.textContent).toContain('Aucune tâche');
    expect(input.value).toBe('');
    expect(element.querySelector('form .delete')).toBeNull();
    expect(element.querySelector('button[type="submit"]')?.textContent?.trim()).toBe('Créer');
  });
});
