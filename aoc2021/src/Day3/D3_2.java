package Day3;
import java.util.Scanner;
import java.util.Arrays;
import java.io.File;
public class D3_2 {
    public static void main(String[] args) throws Exception {
        String[] arr = new String[1000];
        String[] arro = new String[1000];
        String[] arrc = new String[1000];
        String[] arrtmp = new String[1000];
        int s = 0;
        int a;
        char o = '0';
        char c = '0';
        int o2 = 0;
        int co2 = 0;
        int tmmp = 0;
        int tmmpc = 0;
        int tmmptmp;
        int z = 0; 
        File input = new File("./src/Day3/input");
        Scanner i = new Scanner(input);
        while (i.hasNextLine()){
            arr[z] = i.nextLine();
            z++;
        }
        i.close();
        for (z = 0; z < 1000; z++){
            if (arr[z].charAt(0) == '1') s++;
        }
        if (s >= 500) o = '1';
        if (s <= 500) c = '1';
        for (z = 0; z < 1000; z++){
            if (arr[z].charAt(0) == o){
                arro[tmmp] = arr[z];
                tmmp++;
            }
            if (arr[z].charAt(0) == c){
                arrc[tmmpc] = arr[z];
                tmmpc++;
            }
        }
        for (a = 1; a <= 11; a++){
            if (arro[1] != null){
                s = 0;
                for (z = 0; z < tmmp; z++){
                    if (arro[z].charAt(a) == '1') s++;
                }
                if (s >= (tmmp/2)) o = '1';
                else o = '0';
                tmmptmp = tmmp;
                tmmp = 0;
                for (z = 0; z < tmmptmp; z++){
                    if (arro[z].charAt(a) == o){
                        arrtmp[tmmp] = arro[z];
                        tmmp++;
                    }
                }
                Arrays.fill(arro, null);
                for (z = 0; z < 1000; z++) arro[z] = arrtmp[z];
                Arrays.fill(arrtmp, null);
            }
            if (arrc[1] != null){
                s = 0;
                for (z = 0; z < tmmpc; z++){
                    if (arrc[z].charAt(a) == '1') s++;
                }
                if (s < (tmmpc/2)) c = '1';
                else c = '0';
                tmmptmp = tmmpc;
                tmmpc = 0;
                for (z = 0; z < tmmptmp; z++){
                    if (arrc[z].charAt(a) == c){
                        arrtmp[tmmpc] = arrc[z];
                        tmmpc++;
                    }
                }
                Arrays.fill(arrc, null);
                for (z = 0; z < 1000; z++) arrc[z] = arrtmp[z];
                Arrays.fill(arrtmp, null);
            }
        }
        z = 0;
        for (a = 11; a >= 0; a--){
            if (arro[0].charAt(z) == '1') o2 += Math.pow(2, a);
            if (arrc[0].charAt(z) == '1') co2 += Math.pow(2, a);
            z++;
        }
        System.out.println("O2: " + o2);
        System.out.println("CO2: " + co2);
        System.out.println(o2*co2);
    }
}
