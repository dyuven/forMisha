package spbstu.course.six.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import spbstu.course.six.entity.User;
import spbstu.course.six.service.UserService;

import java.util.List;
import java.security.Principal;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @GetMapping
  public ResponseEntity<User> getUser(Principal principal) {
    if (principal == null) {
      return null;
    }

    return ResponseEntity.ok((User) userService.loadUserByUsername(principal.getName()));
  }

  @GetMapping("all")
  @PreAuthorize("hasAnyAuthority('ADMIN')")
  public ResponseEntity<List<User>> getAll() {
    return ResponseEntity.ok(userService.getAll());
  }

  @PostMapping
  public ResponseEntity<User> addUser(@RequestBody User user) {
    return ResponseEntity.ok(userService.save(user));
  }
}
