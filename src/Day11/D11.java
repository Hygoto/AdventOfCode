package Day11;

import java.io.File;
import java.util.Scanner;

public class D11 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day11/input");
        Scanner i = new Scanner(input);
        String z;
        boolean c = false;
        int steps = 100;
        int w = 0;
        int f = 0;
        int [][] p = new int[10][10];
        while (i.hasNextLine()) {
            z = i.nextLine();
            for (int s = 0; s < 10; s++) {
                p[w][s] = Character.getNumericValue(z.charAt(s));
            }
            w++;
        }
        i.close();
        for (;steps > 0; steps--) {
            for (w = 0; w < 10; w++) {
                for (int s = 0; s < 10; s++) {
                    p[w][s]++;
                }
            }
            for (w = 0; w < 10; w++) {
                for (int s = 0; s < 10; s++) {
                    if (p[w][s] > 9) {
                        p[w][s] = 0;
                        f++;

                        if (w+1 < 10 && p[w+1][s] != 0) {
                            p[w+1][s] ++;
                            if (p[w+1][s] > 9) c = true;
                        }
                        if (w+1 < 10 && s+1 < 10 && p[w+1][s+1] != 0) {
                            p[w+1][s+1] ++;
                            if (p[w+1][s+1] > 9) c = true;
                        }
                        if (w-1 > -1 && p[w-1][s] != 0) {
                            p[w-1][s] ++;
                            if (p[w-1][s] > 9) c = true;
                        }
                        if (w-1 > -1 && s+1 < 10 && p[w-1][s+1] != 0) {
                            p[w-1][s+1] ++;
                            if (p[w-1][s+1] > 9) c = true;
                        }
                        if (s+1 < 10 && p[w][s+1] != 0) {
                            p[w][s+1] ++;
                            if (p[w][s+1] > 9) c = true;
                        }
                        if (w-1 > -1 && s-1 > -1 && p[w-1][s-1] != 0) {
                            p[w-1][s-1] ++;
                            if (p[w-1][s-1] > 9) c = true;
                        }
                        if (s-1 > -1 && p[w][s-1] != 0) {
                            p[w][s-1] ++;
                            if (p[w][s-1] > 9) c = true;
                        }
                        if (s-1 > -1 && w+1 < 10 && p[w+1][s-1] != 0) {
                            p[w+1][s-1] ++;
                            if (p[w+1][s-1] > 9) c = true;
                        }
                    }
                }
                if (c) {
                    w = -1;
                    c = false;
                } 
            }
        }
        System.out.println(f);
    }
}
