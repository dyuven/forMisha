package spbstu.course.six.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import spbstu.course.six.entity.Ward;
import spbstu.course.six.repository.WardRepository;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class WardServiceImp implements WardService {
  private final WardRepository wardRepository;

  @Override
  public List<Ward> getAll() {
    return StreamSupport
        .stream(wardRepository.findAll().spliterator(), false)
        .collect(Collectors.toList());
  }

  @Override
  public Ward save(Ward ward) {
    return wardRepository.save(ward);
  }

  @Override
  public Ward update(Ward source, Ward target) {
    BeanUtils.copyProperties(source, target, "id");

    return wardRepository.save(target);
  }

  @Override
  public void delete(Ward ward) {
    wardRepository.delete(ward);
  }
}
