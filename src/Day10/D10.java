package Day10;

import java.io.File;
import java.util.Scanner;

public class D10 {
    public static void main(String[] args) throws Exception {
        File input = new File("./src/Day10/input");
        Scanner i = new Scanner(input);
        int[] b = new int[50];
        int c, p;
        int score = 0;
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
                            score += 3;
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
                            score += 57;
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
                            score += 1197;
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
                            score += 25137;
                        }
                        break;
                }
                c++;
            }
        }
        i.close();
        System.out.println(score);
    }
}
