package Day10;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

public class D10_2 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day10/input");
        Scanner i = new Scanner(input);
        int[] b = new int[50];
        long[] s = new long[90];
        int c, p;
        long score;
        int w = 0;
        String l;
        while (i.hasNextLine()) {
            l = i.nextLine();
            c = 0;
            p = 0;
            while (l.length() > c) {
                switch (l.charAt(c)) {
                    case '(':
                        b[p] = 0;
                        p++;
                        break;
                    case ')':
                        if (b[p-1] == 0) p--;
                        else {
                            c = 999;
                        }
                        break;

                        case '[':
                        b[p] = 1;
                        p++;
                        break;
                    case ']':
                        if (b[p-1] == 1) p--;
                        else {
                            c = 999;
                        }
                        break;

                        case '{':
                        b[p] = 2;
                        p++;
                        break;
                    case '}':
                        if (b[p-1] == 2) p--;
                        else {
                            c = 999;
                        }
                        break;

                        case '<':
                        b[p] = 3;
                        p++;
                        break;
                    case '>':
                        if (b[p-1] == 3) p--;
                        else {
                            c = 999;
                        }
                        break;
                }
                c++;
            }
            if (c != 1000) {
                score = 0;
                p --;
                while (p >= 0) {
                    score *= 5;
                    switch (b[p]) {
                        case 0:
                            score++;
                            p--;
                            break;
                    
                        case 1:
                            score += 2;
                            p--;
                            break;

                        case 2:
                            score += 3;
                            p--;
                            break;

                        case 3:
                            score += 4;
                            p--;
                            break;
                    }
                }
                s[w] = score;
                w++;
                c = 999;
            }
        }
        i.close();
        Arrays.sort(s);
        System.out.println(s[(w/2)+(90-w)]);
    }
}