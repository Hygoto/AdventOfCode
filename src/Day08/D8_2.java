package Day8;

import java.io.File;
import java.util.Arrays;
import java.util.Scanner;

public class D8_2 {
    public static void main(String[] args) throws Exception {
        String[] pain = new String[10];
        String[] seg = new String[10];
        boolean r = false;
        int tmp, tmp2, tmp3;
        int  c = 0;
        File input = new File("./src/Day8/input");
        Scanner i = new Scanner(input);
        while (i.hasNextLine()) {
            Arrays.fill(seg, null);
            for (int s = 0; s < 10; s++) {
                pain[s] = i.next();
            }
            for (int s = 0; s < 10; s++) {
                switch (pain[s].length()) {
                    case 2:
                        seg[1] = pain[s];
                        break;
                
                    case 3:
                        seg[7] = pain[s];
                        break;

                    case 4:
                        seg[4] = pain[s];
                        break;

                    case 7:
                        seg[8] = pain[s];
                        break;
                }
            }
            for (int s = 0; s < 10; s++) {
                switch (pain[s].length()) {

                    case 5:
                        tmp = 0;
                        tmp2 = 0;
                        tmp3 = 0;
                        for (int w = 0; w < 5; w++) {
                            if (seg[3] == null) {
                                if (seg[1].charAt(0) == pain[s].charAt(w) || seg[1].charAt(1) == pain[s].charAt(w)) tmp++;
                                if (tmp == 2) seg[3] = pain[s];
                            }
                            if (seg[3] != null) {
                                if (!seg[3].equals(pain[s])) {
                                    if (seg[4].charAt(0) == pain[s].charAt(w) || seg[4].charAt(1) == pain[s].charAt(w) || seg[4].charAt(2) == pain[s].charAt(w) || seg[4].charAt(3) == pain[s].charAt(w)) tmp2++;
                                    if (tmp2 == 3) seg[5] = pain[s];
                                    else if (tmp3 == 4) seg[2] = pain[s];
                                    tmp3++;
                                }
                            }
                            else r = true;
                        }
                        break;

                    case 6:
                        tmp = 0;
                        tmp2 = 0;
                        tmp3 = 0;
                        for (int w = 0; w < 6; w++) {
                            if (seg[9] == null) {
                                if (seg[4].charAt(0) == pain[s].charAt(w) || seg[4].charAt(1) == pain[s].charAt(w) || seg[4].charAt(2) == pain[s].charAt(w) || seg[4].charAt(3) == pain[s].charAt(w)) tmp++;
                                if (tmp == 4) seg[9] = pain[s];
                            }
                            if (seg[6] == null) {
                                tmp2++;
                                if (seg[1].charAt(0) == pain[s].charAt(w) || seg[1].charAt(1) == pain[s].charAt(w)) {
                                    tmp3++;
                                }
                                if (tmp2 == 6 && tmp3 == 1) seg[6] = pain[s];
                            }
                        }
                        break;
                
                }
                if (r && s == 9) {
                    s = -1;
                    r = false;
                }
            }
            i.next();
            for (int s = 1000; s >= 1; s = s/10) {
                pain[0] = i.next();
                switch (pain[0].length()) {

                    case 2:
                        c += 1*s;
                        break;

                    case 3:
                        c += 7*s;
                        break;
                    
                    case 4:
                        c += 4*s;
                        break;

                    case 5:
                        tmp = 0;
                        tmp2 = 0;
                        tmp3 = 0;
                        r = false;
                        for (int w = 0; w < 5; w++) {
                            for (int q = 0; q < 5; q++) {
                                if (pain[0].charAt(w) == seg[2].charAt(q)) tmp++;
                                if (pain[0].charAt(w) == seg[3].charAt(q)) tmp2++;
                                if (pain[0].charAt(w) == seg[5].charAt(q)) tmp3++;
                                if (tmp == 5 && !r) {
                                    c += 2*s;
                                    r = true;
                                }
                                else if (tmp2 == 5 && !r) {
                                    c += 3*s;
                                    r = true;
                                }
                                else if (tmp3 == 5 && !r) {
                                    c += 5*s;
                                    r = true;
                                }
                            }

                        }
                        break;
                    
                    case 6:
                        tmp = 0;
                        tmp2 = 0;
                        r = false;
                        for (int w = 0; w < 6; w++) {
                            for (int q = 0; q < 6; q++) {
                                if (pain[0].charAt(w) == seg[6].charAt(q)) tmp++;
                                if (pain[0].charAt(w) == seg[9].charAt(q)) tmp2++;
                                if (tmp == 6 && !r) {
                                    c += 6*s;
                                    r = true;
                                }
                                else if (tmp2 == 6 && !r) {
                                    c += 9*s;
                                    r = true;
                                }
                            }

                        }
                        break;
                    
                    case 7:
                        c += 8*s;
                        break;
                }
            }
        }
        i.close();
        System.out.println(c);
    }
}
