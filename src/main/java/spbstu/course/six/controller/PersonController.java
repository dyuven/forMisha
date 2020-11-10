package spbstu.course.six.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import spbstu.course.six.entity.Person;
import spbstu.course.six.service.PersonService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api")
public class PersonController {
  private final PersonService personService;

  @GetMapping("person")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<Person>> getAll() {
    return ResponseEntity.ok(personService.getAll());
  }

  @GetMapping("person/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Person> getOne(@PathVariable("id") Person person) {
    return ResponseEntity.ok(person);
  }

  @PostMapping("person")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Person> saveOne(@RequestBody Person person) {
    return ResponseEntity.ok(personService.save(person));
  }

  @PutMapping("person/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Person> updateOne(@PathVariable("id") Person person, @RequestBody Person updatedPerson) {
    return ResponseEntity.ok(personService.update(updatedPerson, person));
  }

  @DeleteMapping("person/{id}")
  @PreAuthorize("isAuthenticated()")
  public void deleteOne(@PathVariable("id") Person person) {
    personService.delete(person);
  }
}
