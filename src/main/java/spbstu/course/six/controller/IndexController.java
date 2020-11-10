package spbstu.course.six.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexController {
  @GetMapping("/**/{path:[^\\.]*}")
  public String redirect() {
    return "forward:/";
  }
}
