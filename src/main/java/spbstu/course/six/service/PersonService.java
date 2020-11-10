package spbstu.course.six.service;

import spbstu.course.six.entity.Person;

import java.util.List;

public interface PersonService {
  List<Person> getAll();

  Person save(Person person);

  Person update(Person source, Person target);

  void delete(Person person);
}
