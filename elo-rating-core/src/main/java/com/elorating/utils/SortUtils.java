package com.elorating.utils;

import org.springframework.data.domain.Sort;

public class SortUtils {

    public static Sort getSort(String direction) {
        if (direction != null && direction.length() > 0) {
            try {
                return new Sort(Sort.Direction.fromString(direction), "date");
            } catch (IllegalArgumentException e) {
                return new Sort(Sort.Direction.DESC, "date");
            }
        }
        return new Sort(Sort.Direction.DESC, "date");
    }
}
