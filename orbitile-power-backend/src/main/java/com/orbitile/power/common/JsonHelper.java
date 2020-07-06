package com.orbitile.power.common;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class JsonHelper {

  public static List<Integer> unStringifyJson(String array) {
    String[] tokens = array.substring(1, array.length()-1).split(",");
    return
      Arrays.stream(tokens)
        .map(Integer::parseInt)
        .collect(Collectors.toList());
  }
}
