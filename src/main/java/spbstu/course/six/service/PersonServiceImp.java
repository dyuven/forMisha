package spbstu.course.six.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import spbstu.course.six.entity.Person;
import spbstu.course.six.repository.PersonRepositroy;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class PersonServiceImp implements PersonService {
  private final PersonRepositroy personRepositroy;

  @Override
  public List<Person> getAll() {
    return StreamSupport
        .stream(personRepositroy.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @Override
  public Person save(Person person) {
    return personRepositroy.save(person);
  }

  @Override
  public Person update(Person source, Person target) {
    BeanUtils.copyProperties(source, target, "id");

    return personRepositroy.save(target);
  }

  @Override
  public void delete(Person person) {
    personRepositroy.delete(person);
  }
}
