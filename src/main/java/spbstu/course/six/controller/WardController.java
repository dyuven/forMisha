package spbstu.course.six.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import spbstu.course.six.entity.Ward;
import spbstu.course.six.service.WardService;

import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class WardController {
  private final WardService wardService;

  @GetMapping("ward")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<List<Ward>> getAll() {
    return ResponseEntity.ok(wardService.getAll());
  }

  @GetMapping("ward/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Ward> getOne(@PathVariable("id") Ward ward) {
    return ResponseEntity.ok(ward);
  }

  @PostMapping("ward")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Ward> saveOne(@RequestBody Ward ward) {
    return ResponseEntity.ok(wardService.save(ward));
  }

  @PutMapping("ward/{id}")
  @PreAuthorize("isAuthenticated()")
  public ResponseEntity<Ward> updateOne(@PathVariable("id") Ward ward, @RequestBody Ward updatedWard) {
    return ResponseEntity.ok(wardService.update(updatedWard, ward));
  }

  @DeleteMapping("ward/{id}")
  @PreAuthorize("isAuthenticated()")
  public void deleteOne(@PathVariable("id") Ward ward) {
    wardService.delete(ward);
  }
}
