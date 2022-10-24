package Day09;

import java.util.Scanner;
import java.io.File;

public class D9 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day09/input");
        Scanner i = new Scanner(input);
        int[][] h = new int[100][100];
        String tmp;
        int e = 0;
        while (i.hasNextLine()) {
            for (int s = 0; s < 100; s++) {
                tmp = i.nextLine();
                for (int w = 0; w < 100; w++) {
                    h[w][s] = Character.getNumericValue(tmp.charAt(w));
                }
            }
        }
        i.close();
        for (int s = 0; s < 100; s++) {
            for (int w = 0; w < 100; w++) {
                if (s-1 < 0) {
                    if (w-1 < 0) {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                    else if (w+1 > 99) {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s][w-1]) e += h[s][w]+1;
                    }
                    else {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s][w-1] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                }
                else if (s+1 > 99) {
                    if (w-1 < 0) {
                        if (h[s][w] < h[s-1][w] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                    else if (w+1 > 99) {
                        if (h[s][w] < h[s-1][w] && h[s][w] < h[s][w-1]) e += h[s][w]+1;
                    }
                    else {
                        if (h[s][w] < h[s-1][w] && h[s][w] < h[s][w-1] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                }
                else if (w-1 < 0) {
                    if (s-1 < 0) {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                    else if (s+1 > 99) {
                        if (h[s][w] < h[s-1][w] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                    else {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s-1][w] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                    }
                }
                else if (w+1 > 99) {
                    if (s-1 < 0) {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s][w-1]) e += h[s][w]+1;
                    }
                    else if (s+1 > 99) {
                        if (h[s][w] < h[s-1][w] && h[s][w] < h[s][w-1]) e += h[s][w]+1;
                    }
                    else {
                        if (h[s][w] < h[s+1][w] && h[s][w] < h[s-1][w] && h[s][w] < h[s][w-1]) e += h[s][w]+1;
                    }
                }
                else {
                    if (h[s][w] < h[s-1][w] && h[s][w] < h[s+1][w] && h[s][w] < h[s][w-1] && h[s][w] < h[s][w+1]) e += h[s][w]+1;
                }
            }
        }
        System.out.println(e);
    }
}
